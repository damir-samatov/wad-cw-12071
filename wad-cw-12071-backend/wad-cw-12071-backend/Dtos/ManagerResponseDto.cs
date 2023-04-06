using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Dtos
{
    public class ManagerResponseDto
    {
        public int Id { get; set; }

        public static ManagerResponseDto MapFromManager( Manager manager )
        {
            return new ManagerResponseDto()
            {
                Id = manager.Id,
            };
        }
    }
}
