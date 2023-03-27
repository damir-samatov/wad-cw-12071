using System.ComponentModel.DataAnnotations;

namespace wad_cw_12071_backend.Dtos
{
    public class LoginResponseDto
    {
        public string SessionId { get; set; }

        public string Role { get; set; }
    }
}
