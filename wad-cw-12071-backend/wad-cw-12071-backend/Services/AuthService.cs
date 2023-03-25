using wad_cw_12071_backend.Dtos;
using wad_cw_12071_backend.Models;
using wad_cw_12071_backend.Repository;

namespace wad_cw_12071_backend.Services
{
    public class AuthService
    {
        private readonly AuthRepository _authRepository;

        private readonly EmployeeRepository _employeeRepository;

        private readonly ManagerRepository _managerRepository;

        public AuthService(
                AuthRepository authRepository,
                EmployeeRepository employeeRepository,
                ManagerRepository managerRepository
            )
        {
            _authRepository = authRepository;
            _employeeRepository = employeeRepository;
            _managerRepository = managerRepository;
        }

        public bool RegisterEmployee( Employee employee )
        {
            var isLoginTaken = _employeeRepository.isLoginPresent(employee.Login);

            if ( isLoginTaken ) return false;

            return _employeeRepository.Insert(employee);
        }

        public bool Logout( string sessionId )
        {
            var isEmployeeLogedOut = _authRepository.DeleteEmployeeSession(sessionId);

            var isManagerLogedOut = _authRepository.DeleteManagerSession(sessionId);

            return ( isEmployeeLogedOut || isManagerLogedOut );
        }

        public EmployeeSession? LoginEmployee( LoginDto loginDto )
        {
            var employee = _authRepository.GetEmployeeByLogin(loginDto.Login);

            if ( employee == null ) return null;

            if ( employee.Password != loginDto.Password ) return null;

            EmployeeSession employeeSession = new()
            {
                EmployeeId = employee.Id,

                SessionId = Guid.NewGuid().ToString(),
            };

            bool isSuccess = _authRepository.CreateEmployeeSession(employeeSession);

            if ( !isSuccess ) return null;

            return employeeSession;
        }

        public ManagerSession? LoginManager( LoginDto loginDto )
        {
            var manager = _authRepository.GetManagerByLogin(loginDto.Login);

            if ( manager == null ) return null;

            if ( manager.Password != loginDto.Password ) return null;

            ManagerSession managerSession = new()
            {
                ManagerId = manager.Id,

                SessionId = Guid.NewGuid().ToString(),
            };

            bool isSuccess = _authRepository.CreateManagerSession(managerSession);

            if ( !isSuccess ) return null;

            return managerSession;
        }

        public Employee? AuthorizeEmployee( string sessionId )
        {
            var employeeSession = _authRepository.GetEmployeeSessionById(sessionId);

            if ( employeeSession == null ) return null;

            var employee = _employeeRepository.GetOne(employeeSession.EmployeeId);

            return employee;
        }

        public Manager? AuthorizeManager( string sessionId )
        {
            var managerSession = _authRepository.GetManagerSessionById(sessionId);

            if ( managerSession == null ) return null;

            var manager = _managerRepository.GetOne(managerSession.ManagerId);

            return manager;
        }
    }
}
