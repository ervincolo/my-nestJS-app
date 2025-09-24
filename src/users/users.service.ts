import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "email": "marko@example.com",
            "name": "Marko Marković",
            "role": "admin"
          },
          {
            "id": 2,
            "email": "ana@example.com",
            "name": "Ana Anić",
            "role": "user"
          },
          {
            "id": 3,
            "email": "ivan@example.com",
            "name": "Ivan Ivković",
            "role": "moderator"
          },
          {
            "id": 4,
            "email": "jelena@example.com",
            "name": "Jelena Jelić",
            "role": "user"
          },
          {
            "id": 5,
            "email": "petar@example.com",
            "name": "Petar Petrović",
            "role": "editor"
          }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
                return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found!')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
            this.users = this.users.map(user => {
                if (user.id === id) {
                    return {...user, ...updateUserDto}
                }
                return user
            })

            return this.findOne(id)
        }

        delete(id: number) {
            const removedUser = this.findOne(id)
            
            this.users = this.users.filter(user => user.id !== id)

            return removedUser
        }
}    
             
