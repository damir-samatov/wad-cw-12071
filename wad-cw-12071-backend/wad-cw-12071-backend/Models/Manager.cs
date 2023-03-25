
using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Models
{
    public class Manager
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 4, ErrorMessage = "Login should be 4 characters or longer")]
        public string Login { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password should be 8 characters or longer")]
        public string Password { get; set; }
    }
}
