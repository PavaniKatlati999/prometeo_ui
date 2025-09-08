{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "../", // Set baseUrl to project root
  },
  "include": [
    "../src/**/*",
    "./**/*"
  ],
  "exclude": [
    "../.eslint-custom",
    "../.scripts",
    "../node_modules",
    "../dist",
  ]
}
