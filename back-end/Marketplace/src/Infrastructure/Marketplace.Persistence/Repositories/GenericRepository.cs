using System.Data;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;

namespace Marketplace.Persistence.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly IUnitOfWork _unitOfWork;
        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IDbConnection Connection => _unitOfWork.Connection;

        public List<T> GetAll()
        {
            return Connection.GetList<T>().ToList();
        }
        public T GetById(int id)
        {
            return Connection.Get<T>(id);
        }
        public int Create(T entity)
        {
            return (int)Connection.Insert<T>(entity);
        }
        public void Update(T entity)
        {
            Connection.Update<T>(entity);
        }
        public void Delete(int id)
        {
            Connection.Delete<T>(id);
        }
    }
}