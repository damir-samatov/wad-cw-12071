using wad_cw_12071_backend.Data;
using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Repository
{
    public class AuthRepository
    {
        public AuthRepository( DataContext dbContext )
        {
            _dbContext = dbContext;
        }

        private readonly DataContext _dbContext;

        public EmployeeSession? GetEmployeeSessionById( string sessionId )
        {
            return _dbContext.EmployeeSessions.Where(es => es.SessionId == sessionId).FirstOrDefault();
        }

        public Employee? GetEmployeeByLogin( string login )
        {
            return _dbContext.Employees.Where(e => e.Login == login).FirstOrDefault();
        }
        public bool CreateEmployeeSession( EmployeeSession employeeSession )
        {
            try
            {
                _dbContext.EmployeeSessions.Add(employeeSession);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteEmployeeSession( string sessionId )
        {
            try
            {
                var employeeSession = GetEmployeeSessionById(sessionId);

                if ( employeeSession == null ) return false;

                _dbContext.EmployeeSessions.Remove(employeeSession);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public ManagerSession? GetManagerSessionById( string sessionId )
        {
            return _dbContext.ManagerSessions.Where(es => es.SessionId == sessionId).FirstOrDefault();
        }

        public Manager? GetManagerByLogin( string login )
        {
            return _dbContext.Managers.Where(e => e.Login == login).FirstOrDefault();
        }

        public bool CreateManagerSession( ManagerSession managerSession )
        {
            try
            {
                _dbContext.ManagerSessions.Add(managerSession);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteManagerSession( string sessionId )
        {
            try
            {
                var managerSession = GetManagerSessionById(sessionId);

                if ( managerSession == null ) return false;

                _dbContext.ManagerSessions.Remove(managerSession);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
