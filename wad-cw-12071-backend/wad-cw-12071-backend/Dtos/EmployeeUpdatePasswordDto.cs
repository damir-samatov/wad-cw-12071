using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Dtos
{
    public class EmployeeUpdatePasswordDto
    {
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password should be 8 characters or longer")]
        public string Password { get; set; }
    }
}
