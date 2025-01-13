docker-compose up | (
npm install
npm run build
npx prisma generate
npx prisma db push
npm run start
)