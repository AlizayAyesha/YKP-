import { spawn } from 'node:child_process';

function run(command: string, args: string[]) {
  const child = spawn(command, args, { stdio: 'inherit', shell: true });
  child.on('exit', (code) => {
    if (code && code !== 0) process.exit(code);
  });
  return child;
}

run('npx', ['tsx', 'watch', 'server/index.ts']);
run('npx', ['vite', '--port=3000', '--host=0.0.0.0']);
