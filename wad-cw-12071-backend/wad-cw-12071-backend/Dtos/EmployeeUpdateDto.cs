using wad_cw_12071_backend.Models;
using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Dtos
{
    public class EmployeeUpdateDto
    {
        [StringLength(100, MinimumLength = 4, ErrorMessage = "Login should be 4 characters or longer")]
        public string Login { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string JobTitle { get; set; }

        [StringLength(300)]
        public string Bio { get; set; }
    }
}
