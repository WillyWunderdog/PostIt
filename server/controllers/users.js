import md5 from 'md5';
import models from '../models';

export default {
  create(req, res) {
    return models.User
      .create({
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: md5(req.body.password)

      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return models.User
      .findAll({
        include: [{ all: true }]
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    return models.User
      .findOne({ where:
        { username: req.body.username, password: md5(req.body.password) } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Invalid username or password'
          });
        }
        req.session.user = user;
        res.status(202).send(user);
      })
      .catch(error => res.status(400).send(error));
  }

};
