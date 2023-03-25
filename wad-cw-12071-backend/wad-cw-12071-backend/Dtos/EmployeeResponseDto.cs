using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Dtos
{
    public class EmployeeResponseDto
    {
        public int Id { get; set; }
        public string Login { get; set; } = "";

        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string JobTitle { get; set; } = "";

        public string Bio { get; set; } = "";

        public static EmployeeResponseDto MapFromEmployee( Employee employee )
        {
            return new EmployeeResponseDto() { 
                Id = employee.Id,
                Login = employee.Login,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                JobTitle = employee.JobTitle,
                Bio = employee.Bio
            };
        }
    }
}
