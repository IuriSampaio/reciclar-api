import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";

class user {

  path: string = "/user"

  async store(req: Request, res: Response) {
    const userRepository = getRepository(User)

    const { name, email, password, is_recicler, is_point_of_collect } = req.body;

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists)
      return res.send({ "message": "user already exists" }).status(409);

    const user = userRepository.create({ name, email, password, is_recicler, is_point_of_collect });

    await userRepository.save(user);

    return res.status(201).send({ "message": "user created successfully", user });
  }
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return res.send(users).status(201);
  }
  async login(req: Request, res: Response) {
    const userRepository = getRepository(User)

    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user)
      return res.status(401).send({ "message": "user not found" });

    const isValidPass = await compare(password, user.password);

    if (!isValidPass)
      return res.status(403).send({ "message": "password is not valid" });

    const token = sign({ id: user.sys_id }, "SECRET_KEY", { expiresIn: '1d' })

    return res.send({ "message": "sucefully logged in application", user, token }).status(200);
  }
  async show(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find(({ where: req.query }))

    if (!user)
      return res.status(401).send({ message: "User not found" });

    return res.send({ "message": "User founded", users });
  }
  async update(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const { sys_id } = req.params;

    const user = await userRepository.findOne({ where: { sys_id } });

    if (!user)
      return res.status(401).send({ message: "User not found" });


    const userUpdated = await userRepository.update(user.sys_id, req.body);

    //const userUpdated = await userRepository.save(userToUp);

    return res.status(200).send({ "message": "User sucefully updated", userUpdated });
  }
  async delete(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const { sys_id } = req.params;

    const deleteUser = await userRepository.delete(sys_id);

    if (!deleteUser)
      return res.status(401).send({ "message": "user doesn't exist" });

    return res.send({ "message": "user sucefully deleted", deletedId: sys_id, deleteUser })
  }

}

export default new user();