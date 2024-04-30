using Backend.DTOs;
using Backend.Entities;

namespace Backend.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
    }
}