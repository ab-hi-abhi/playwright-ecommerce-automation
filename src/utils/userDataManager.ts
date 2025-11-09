import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'users.json');

interface User {
  username: string;
  email: string;
  password: string;
}

interface UsersFile {
  users: User[];
}

export class UserDataManager {
  static getAllUsers(): User[] {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: UsersFile = JSON.parse(raw);
    return data.users;
  }

  static getLastUser(): User | undefined {
    const users = this.getAllUsers();
    return users[users.length - 1];
  }

  static addUser(user: User): void {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: UsersFile = JSON.parse(raw);
    data.users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}