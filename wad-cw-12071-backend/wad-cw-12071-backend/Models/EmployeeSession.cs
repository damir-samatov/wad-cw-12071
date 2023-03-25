using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace wad_cw_12071_backend.Models
{
    [PrimaryKey(nameof(SessionId))]
    public class EmployeeSession
    {
        public string SessionId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public int EmployeeId { get; set; }
    }
}
