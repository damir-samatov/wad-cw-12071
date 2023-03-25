using Microsoft.AspNetCore.Mvc;
using wad_cw_12071_backend.Dtos;
using wad_cw_12071_backend.Models;
using wad_cw_12071_backend.Repository;

namespace wad_cw_12071_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly TicketRepository _ticketRepository;

        private readonly EmployeeRepository _employeeRepository;

        public ManagerController(
                TicketRepository ticketRepository,
                EmployeeRepository employeeRepository
            )
        {
            _ticketRepository = ticketRepository;
            _employeeRepository = employeeRepository;
        }

        [HttpGet("tickets")]
        public IActionResult GetAllTickets()
        {
            IEnumerable<Ticket> tickets = _ticketRepository.GetAll();

            return Ok(tickets);
        }

        [HttpGet("tickets/{id}")]
        public IActionResult GetTicketById( int id )
        {
            var ticket = _ticketRepository.GetOne(id);

            if ( ticket == null ) return NotFound();

            return Ok(ticket);
        }

        [HttpPost("tickets")]
        public IActionResult CreateTicket( [FromBody] Ticket ticket )
        {
            var employeeExists = _employeeRepository.isPresent(ticket.EmployeeId);

            if ( !employeeExists ) return BadRequest();

            var isSuccess = _ticketRepository.Insert(ticket);

            if ( isSuccess ) return Ok(ticket);

            return BadRequest();
        }

        [HttpPut("tickets")]
        public IActionResult UpdateTicket( [FromBody] Ticket ticket )
        {
            var employeeExists = _employeeRepository.isPresent(ticket.EmployeeId);

            var ticketExists = _ticketRepository.isPresent(ticket.Id);

            if ( !employeeExists || !ticketExists ) return BadRequest();

            var isSuccess = _ticketRepository.Update(ticket);

            if ( isSuccess ) return Ok(ticket);

            return BadRequest();
        }

        [HttpDelete("tickets/{id}")]
        public IActionResult DeleteTicket( int id )
        {
            var ticketExists = _ticketRepository.isPresent(id);

            if ( !ticketExists ) return BadRequest();

            var isSuccess = _ticketRepository.Delete(id);

            if ( isSuccess ) return Ok();

            return BadRequest();
        }

        [HttpGet("employees")]
        public IActionResult GetAllEmployees()
        {
            IEnumerable<Employee> employees = _employeeRepository.GetAll();

            List<EmployeeResponseDto> employeeResponseDtos = new() { };

            foreach ( Employee employee in employees )
            {
                var employeeResponseDto = EmployeeResponseDto.MapFromEmployee(employee);

                employeeResponseDtos.Add(employeeResponseDto);
            }

            return Ok(employeeResponseDtos);
        }

        [HttpGet("employees/{id}")]
        public IActionResult GetEmployeeById( int id )
        {
            var employee = _employeeRepository.GetOne(id);

            if ( employee == null ) return NotFound();

            var employeeResponseDto = EmployeeResponseDto.MapFromEmployee(employee);

            return Ok(employeeResponseDto);
        }
    }
}
