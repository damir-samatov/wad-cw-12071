using Microsoft.AspNetCore.Mvc;
using wad_cw_12071_backend.Dtos;
using wad_cw_12071_backend.Models;
using wad_cw_12071_backend.Repository;

namespace wad_cw_12071_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly TicketRepository _ticketRepository;

        private readonly EmployeeRepository _employeeRepository;

        public EmployeeController(
                TicketRepository ticketRepository,
                EmployeeRepository employeeRepository
            )
        {
            _ticketRepository = ticketRepository;
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IActionResult GetSelf()
        {
            var employeeId = GetEmployeeId();

            var employee = _employeeRepository.GetOne(employeeId);

            if ( employee == null ) return BadRequest();

            EmployeeResponseDto employeeResponseDto = EmployeeResponseDto.MapFromEmployee(employee);

            return Ok(employeeResponseDto);
        }

        [HttpPut]
        public IActionResult UpdateSelf([FromBody] EmployeeUpdateDto employeeUpdateDto)
        {
            var employeeId = GetEmployeeId();

            var employee = _employeeRepository.GetOne(employeeId);

            if ( employee == null ) return BadRequest();

            employee.Login = employeeUpdateDto.Login;
            employee.FirstName = employeeUpdateDto.FirstName;
            employee.JobTitle = employeeUpdateDto.JobTitle;
            employee.LastName = employeeUpdateDto.LastName;
            employee.Bio = employeeUpdateDto.Bio;

            var isSucess = _employeeRepository.Update(employee);

            if( !isSucess ) return BadRequest(); 

            var employeeResponseDto = EmployeeResponseDto.MapFromEmployee(employee);

            return Ok(employeeResponseDto);
        }

        [HttpPut("password")]
        public IActionResult UpdatePassword( [FromBody] EmployeeUpdatePasswordDto employeeUpdatePasswordDto )
        {
            var employeeId = GetEmployeeId();

            var employee = _employeeRepository.GetOne(employeeId);

            if ( employee == null ) return BadRequest();

            employee.Password = employeeUpdatePasswordDto.Password;

            var isSucess = _employeeRepository.Update(employee);

            if ( !isSucess ) return BadRequest();

            var employeeResponseDto = EmployeeResponseDto.MapFromEmployee(employee);

            return Ok(employeeResponseDto);
        }

        [HttpGet("tickets")]
        public IActionResult GetAllTickets()
        {
            var employeeId = GetEmployeeId();

            IEnumerable<Ticket> tickets = _ticketRepository.GetAllForEmployee(employeeId);

            return Ok(tickets);
        }

        [HttpGet("tickets/{id}")]
        public IActionResult GetTicketById( int id )
        {
            var employeeId = GetEmployeeId();

            var ticket = _ticketRepository.GetOneForEmployee(id, employeeId);

            if ( ticket == null ) return NotFound();

            return Ok(ticket);
        }

        [HttpPut("tickets/{id}")]
        public IActionResult UpdateTicket( 
                [FromBody] EmployeeUpdateTicketStatusDto employeeUpdateTicketStatusDto, 
                int id 
            )
        {
            var employeeId = GetEmployeeId();

            var ticket = _ticketRepository.GetOneForEmployee(id, employeeId);

            if ( ticket == null ) return BadRequest();

            ticket.Status = employeeUpdateTicketStatusDto.Status;

            var isSuccess = _ticketRepository.Update(ticket);

            if ( isSuccess ) return Ok(ticket);

            return BadRequest();
        }

        private int GetEmployeeId()
        {
            return ( int )HttpContext.Items[ "EmployeeId" ]!;
        }
    }
}
