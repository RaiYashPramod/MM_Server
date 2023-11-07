const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const selectMovieUpdate = async (req, res) => {
  const { id, otherMovieId } = req.body;

  try {
    const existingMovie1 = await prisma.movies.findFirst({
      where: {
        movie_id: id,
      },
    });

    const existingMovie2 = await prisma.movies.findFirst({
      where: {
        movie_id: otherMovieId,
      },
    });

    if (!existingMovie1) {
      await prisma.movies.create({
        data: {
          movie_id: id,
        },
      });
    }

    if (!existingMovie2) {
      await prisma.movies.create({
        data: {
          movie_id: otherMovieId,
        },
      });
    }

    if (existingMovie1) {
      await prisma.movies.update({
        where: {
          movie_id: id,
        },
        data: {
          rating: {
            increment: 8,
          },
        },
      });
    }

    if (existingMovie2) {
      await prisma.movies.update({
        where: {
          movie_id: otherMovieId,
        },
        data: {
          rating: {
            decrement: 8,
          },
        },
      });
    }

    res.status(200).json({ message: "Movie rating updated" });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//In the below function i want to reset the list every week 

const resetMovieList = async (req, res) => {  
  try {
    await prisma.movies.deleteMany();
    res.status(200).json({ message: "Movie list reset" });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
}

const prefferedMovieList = async (req, res) => {
  try {
    const topMovies = await prisma.movies.findMany({
      orderBy: {
        rating: "desc",
      },
      take: 5, // Only take the top 20 movies
    });

    res.send(topMovies);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching preferred movies" });
  }
};

const createBattle = async (req, res) => {
  try {
    const { movie1Id, movie2Id } = req.body;

    const battle = await prisma.movieBattle.findFirst({
      where: {
        OR: [
          { movie1Id: movie1Id, movie2Id: movie2Id },
          { movie1Id: movie2Id, movie2Id: movie1Id },
        ],
      },
    });

    if (battle) {
      res
        .status(405)
        .json({ message: "This battle already exists in the battleground." });
    } else {
      await prisma.movieBattle.create({
        data: {
          movie1Id: movie1Id,
          movie2Id: movie2Id,
        },
      });
      res.status(200).json({ message: "Movie Battle Created Successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the battle" });
  }
};

const getBattles = async (req, res) => {
  try {
    const availableBattles = await prisma.movieBattle.findMany();

    res.send(availableBattles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Battles" });
  }
};

const getBattle = async (req, res) => {
  const { id } = req.params;

  const noId = parseInt(id)

  try {
    const battleDetails = await prisma.movieBattle.findUnique({
      where: {
        id: noId
      }
    });

    if (!battleDetails) {
      return res.status(404).json({ error: "Battle details not found." });
    }

    res.status(200).json({ battleDetails });
  } catch (error) {
    console.error("Error fetching battle details:", error);
    res.status(500).json({ error: "An error occurred while fetching battle details." });
  }
};

module.exports = {
  selectMovieUpdate,
  prefferedMovieList,
  createBattle,
  getBattles,
  getBattle,
};
