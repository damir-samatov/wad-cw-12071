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

        private readonly CookieOptions _cookieOptions = new()
        {
            Secure = false,
            HttpOnly = true,
        };

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

        [HttpPost("login/employee")]
        public IActionResult LoginEmployee( [FromBody] LoginDto loginDto )
        {
            var employeeSession = _authService.LoginEmployee(loginDto);

            if ( employeeSession == null ) return BadRequest();

            Response.Cookies.Append("sessionId", employeeSession.SessionId, _cookieOptions);

            return Ok();
        }

        [HttpPost("login/manager")]
        public IActionResult LoginManager( [FromBody] LoginDto loginDto )
        {
            var managerSession = _authService.LoginManager(loginDto);

            if ( managerSession == null ) return BadRequest();

            Response.Cookies.Append("sessionId", managerSession.SessionId, _cookieOptions);

            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var sessionId = Request.Cookies["sessionId"];

            if ( sessionId == null ) return BadRequest();

            var isSuccess = _authService.Logout(sessionId);

            if ( isSuccess ) return Ok();

            return BadRequest();
        }
    }
}
