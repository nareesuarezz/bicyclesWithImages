const db = require("../models");
const Cars = db.cars;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');

// Create and Save a new Bicycle
exports.create = (req, res) => {



  // Create a Car
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    motor: req.body.motor,
    filename: req.file ? req.file.filename : ""
  }

  // Save Car in the database
  Cars.create(car).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the car"
    })
  });
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  Cars.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all cars"
    })
  })
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cars.findOne({
    where: { id: id }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id
      });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cars.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Car with id=" + id
      });
    });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cars.findOne({
    where: { id: id }
  })
    .then(car => {
      if (!car) {
        return res.status(404).send({
          message: `Car with id=${id} not found.`
        });
      }

      // Obtén la ruta del directorio del controlador
      const controllerDir = path.dirname(__filename);

      // Construye la ruta relativa al archivo de imagen
      const imagePath = path.join(controllerDir, '../public/images', car.filename);

      // Elimina el archivo de imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen:', err);
        }
      });

      // Elimina el registro del coche en la base de datos
      car.destroy()
        .then(() => {
          res.send({
            message: 'Car was deleted successfully.'
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error deleting Car with id=${id}: ${err.message}`
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Car with id=${id}: ${err.message}`
      });
    });
};

exports.deleteAll = (req, res) => {
  Cars.findAll()
    .then(cars => {
      cars.forEach(car => {
        // Obtén la ruta del directorio del controlador
        const controllerDir = path.dirname(__filename);

        // Construye la ruta relativa al archivo de imagen
        const imagePath = path.join(controllerDir, '../public/images', car.filename);

        // Elimina el archivo de imagen
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error al eliminar la imagen:', err);
          }
        });

        // Elimina el registro del coche en la base de datos
        car.destroy()
          .catch((err) => {
            console.error(`Error deleting Car with id=${car.id}: ${err.message}`);
          });
      });

      // Elimina todos los registros de coches en la base de datos
      return Cars.destroy({
        where: {},
        truncate: false
      });
    })
    .then((nums) => {
      res.send({ message: `${nums} Cars were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error occurred while removing all cars: ${err.message}`
      });
    });
};

