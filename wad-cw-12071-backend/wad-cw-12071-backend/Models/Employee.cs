
using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 4, ErrorMessage = "Login should be 4 characters or longer")]
        public string Login { get; set; }

        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password should be 8 characters or longer")]
        public string Password { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string JobTitle { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; }
        
        [StringLength(100)]
        public string LastName { get; set; }
        
        [StringLength(300)]
        public string Bio { get; set; }
    }
}
