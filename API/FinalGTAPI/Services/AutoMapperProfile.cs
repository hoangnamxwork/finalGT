using AutoMapper;
using FinalGTAPI.DTO;
using FinalGTAPI.DTOs;

namespace FinalGTAPI.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<Quiz, QuizDTO>();
            CreateMap<QuizDTO, Quiz>();
            CreateMap<Subject, SubjectDTO>();
            CreateMap<SubjectDTO, Subject>();
            CreateMap<TestResult,TestResultDTO>();
            CreateMap<TestResultDTO,TestResult>();
            CreateMap<Result, ResultDTO>();
            CreateMap<ResultDTO, ResultDTO>();
        }
    }
}
