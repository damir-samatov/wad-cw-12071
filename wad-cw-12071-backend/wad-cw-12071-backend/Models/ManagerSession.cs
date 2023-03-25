using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace wad_cw_12071_backend.Models
{
    [PrimaryKey(nameof(SessionId))]
    public class ManagerSession
    {
        public string SessionId { get; set; }

        [ForeignKey(nameof(ManagerId))]
        public int ManagerId { get; set; }
    }
}
