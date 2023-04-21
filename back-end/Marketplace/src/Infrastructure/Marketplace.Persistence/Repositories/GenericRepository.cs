using System.Data;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;

namespace Marketplace.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly IUnitOfWork _unitOfWork;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IDbConnection Connection => _unitOfWork.Connection;

        public IDbTransaction Transaction => _unitOfWork.Transaction;

        public async Task<List<T>> GetAll()
        {
            return (await Connection.GetListAsync<T>(null, null, Transaction)).ToList();
        }

        public async Task<T> GetById(int id)
        {
            return await Connection.GetAsync<T>(id, Transaction);
        }

        public async Task<int> Create(T entity)
        {
            return (int)await Connection.InsertAsync<T>(entity, Transaction);
        }

        public async Task Update(T entity)
        {
            await Connection.UpdateAsync<T>(entity, Transaction);
        }

        public async Task Delete(int id)
        {
            await Connection.DeleteAsync<T>(id, Transaction);
        }
    }
}