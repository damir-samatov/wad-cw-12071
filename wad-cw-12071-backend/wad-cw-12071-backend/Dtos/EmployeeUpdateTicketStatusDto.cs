using wad_cw_12071_backend.Models;
using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Dtos
{
    public class EmployeeUpdateTicketStatusDto
    {
        [Required]
        [ValidTicketStatus]
        public string Status { get; set; } = "TO DO";
    }
}
