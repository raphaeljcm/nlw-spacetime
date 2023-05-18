# Typescript

tsc = transpiler
tsx = kind of an automation, it will transpiler the code and run it, we can set it
to watch mode as well

# Prisma

## npx prisma studio
Open the prisma GUI where we can see all our data, it's like a sgbd

## npx prisma migrate dev
Create our migrations

## npx prisma init --datasource-provider SQLite
Setup up a new Prisma project and set it to use SQLite, 'cause prisma uses Postgress as default

Remember:
  - prisma must be a development dependency
  - @prisma/client on the other hand I'll use in prod
