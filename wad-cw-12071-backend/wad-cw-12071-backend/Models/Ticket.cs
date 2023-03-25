using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wad_cw_12071_backend.Models
{
    public class ValidTicketPriorityAttribute : ValidationAttribute
    {
        public readonly static List<string> TicketPriorities = new() {
            "Lowest",
            "Low",
            "Medium",
            "High",
            "Highest"
        };
        protected override ValidationResult IsValid( object? value, ValidationContext validationContext )
        {
            if ( TicketPriorities.Contains(value) ) return ValidationResult.Success;

            return new ValidationResult("Invalid priority value.");
        }
    }

    public class ValidTicketStatusAttribute : ValidationAttribute
    {
        public readonly static List<string> TicketStatuses = new() {
            "TO DO",
            "IN PROGRESS",
            "IN QA",
            "IN CODE REVIEW",
            "DONE"
        };
        protected override ValidationResult IsValid( object? value, ValidationContext validationContext )
        {
            if ( TicketStatuses.Contains(value) ) return ValidationResult.Success;

            return new ValidationResult("Invalid status value.");
        }
    }

    public class Ticket
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(EmployeeId))]
        public int EmployeeId { get; set; }

        [Required]
        [ValidTicketPriority]
        public string Priority { get; set; } = "Medium";

        [Required]
        [ValidTicketStatus]
        public string Status { get; set; } = "TO DO";

        [StringLength(200)]
        public string Title { get; set; }
        
        [StringLength(2000)]
        public string Description { get; set; }

    }
}
