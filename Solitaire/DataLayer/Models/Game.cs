using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoRepository;

namespace DataLayer.Models
{
    [CollectionName("Games")]
    public class Game: Entity
    {
        public DateTime CreateDate { get; set; }
        public string UserId { get; set; }
        public List<int[][]> States { get; set; }

        public Game()
        {
            
        }

    }
}
