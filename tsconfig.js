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
      // !important ./
      "@cfxmodules/*": ["./modules/*"],
      // "@blips/*": ["./modules/blips/*"],
      "@cfxtypes": ["./cfxtypes"],
      "@exception/*": ["./error/*"]
    }
  },
  "include": ["**/*.ts", "**/*.js", "cfxtypes.d.ts"],
  "exclude": ["node_modules", "dist"]
}
