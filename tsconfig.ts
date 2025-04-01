{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "baseUrl": "./",
    "outDir": "./app/dependencies",
    "paths": {
      "@app/*": ["app/*"]
    }
  },
  "include": ["app/**/*.ts"],
  "exclude": ["node_modules"]
}
