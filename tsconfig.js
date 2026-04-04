{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext", 
    "types": [
        "@citizenfx/client",
        "@citizenfx/server"
    ],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@modules/*": ["./modules/*"],
      "@blips/*": ["./modules/blips/*"]
    }
  },
  "include": ["**/*.ts", "**/*.js"],
  "exclude": ["node_modules", "dist"]
}
