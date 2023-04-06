using Microsoft.AspNetCore.Mvc;
using wad_cw_12071_backend.Dtos;
using wad_cw_12071_backend.Models;
using wad_cw_12071_backend.Services;

namespace wad_cw_12071_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController( AuthService authService )
        {
            _authService = authService;
        }

        [HttpPost("register/employee")]
        public IActionResult RegisterEmployee( [FromBody] Employee employee )
        {
            var isSuccess = _authService.RegisterEmployee(employee);

            if ( isSuccess ) return Created("/api/auth/register/employee", employee);

            return BadRequest("Login is taken");
        }

        [HttpPost("login")]
        public IActionResult Login( [FromBody] LoginRequestDto loginRequestDto )
        {
            if ( loginRequestDto.IsManager )
            {
                var managerSession = _authService.LoginManager(loginRequestDto);

                if ( managerSession == null ) return BadRequest();

                var loginResponse = new LoginResponseDto()
                {
                    SessionId = managerSession.SessionId,
                    Role = "manager",
                };

                return Ok(loginResponse);
            }
            else
            {
                var employeeSession = _authService.LoginEmployee(loginRequestDto);

                if ( employeeSession == null ) return BadRequest();

                var loginResponse = new LoginResponseDto()
                {
                    SessionId = employeeSession.SessionId,
                    Role = "employee",
                };

                return Ok(loginResponse);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var sessionId = Request.Headers[ "X-Auth-Token" ].ToString();

            var isSuccess = _authService.Logout(sessionId);

            if ( isSuccess ) return Ok();

            return BadRequest();
        }
    }
}
