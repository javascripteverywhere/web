import { build, fake } from 'test-data-bot';

const userBuilder = build('User').fields({
  username: fake(f => f.internet.userName()),
  email: fake(f => f.internet.email()),
  password: fake(f => f.internet.password())
});

export { userBuilder };
