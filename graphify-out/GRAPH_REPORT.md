# Graph Report - .  (2026-08-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1755 nodes · 3523 edges · 145 communities (92 shown, 53 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 191 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27f27712`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RequestUser
- CreateCommentDto
- followers.service.ts
- UsersService
- AuthService
- MessengerGateway
- .upload
- SidebarMenu.tsx
- useUIStore.ts
- messages.service.ts
- CreatePost.tsx
- post/api/postsApi.ts
- ConversationsService
- devDependencies
- IMessagesRepository
- scripts
- EditProfileModal.tsx
- devDependencies
- conversations.service.ts
- devDependencies
- compilerOptions
- compilerOptions
- Profile.tsx
- dependencies
- ConversationsRepository
- MessagesRepository
- .editPost
- compilerOptions
- app.module.ts
- PostsService
- App.tsx
- RegisterForm.test.tsx
- Avatar.tsx
- compilerOptions
- scripts
- RedisService
- PrismaService
- posts.service.ts
- RegisterForm.tsx
- LoginPage.tsx
- dependencies
- scripts
- ForgotPasswordPage.tsx
- likes.module.ts
- LoginForm.tsx
- ReportDetailsModal.tsx
- messenger.mapper.ts
- checkoutApi.ts
- package.json
- overrides
- validate-eol.js
- backend/package.json
- .addLike
- src/main.ts
- allowScripts
- collectCoverageFrom
- CreatePostDto
- clean.js
- EnvironmentVariables
- EditPostDto
- GetPostsQueryDto
- exclude
- frontend/package.json
- vercel.json
- jest
- AllExceptionsFilter
- pagination.ts
- LikesService
- main.tsx
- lint-staged
- check-env.js
- nest-cli.json
- global
- FloatingCards.tsx
- .prettierrc.json
- types
- ws-events.ts
- server.ts
- coverageReporters
- moduleFileExtensions
- include
- postinstall.js
- eslint
- @eslint/js
- globals
- @types/node
- babel-plugin-react-compiler
- bullmq
- class-validator
- dotenv
- @nestjs/bull
- @nestjs/common
- @nestjs/core
- @nestjs/passport
- nestjs-pino
- @nestjs/platform-express
- @nestjs/platform-socket.io
- @nestjs/throttler
- PostCard.tsx
- passport
- passport-jwt
- pino-http
- @prisma/client
- reflect-metadata
- rxjs
- socket.io
- jest
- prettier
- supertest
- ts-node
- @types/express
- @types/supertest
- likes.types.ts
- @nestjs/config
- lucide-react
- react-dom
- react-hook-form
- react-router
- react-router-dom
- @sentry/react
- @tailwindcss/vite
- zod
- msw
- prettier
- @storybook/addon-a11y
- @storybook/react-vite
- @storybook/test
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- vitest
- @vitest/ui
- .storybook/main.ts
- preview.ts
- commit-msg
- pre-commit
- pre-push
- @hookform/resolvers

## God Nodes (most connected - your core abstractions)
1. `RequestUser` - 61 edges
2. `CurrentUser` - 58 edges
3. `MessengerGateway` - 32 edges
4. `ConversationsService` - 31 edges
5. `scripts` - 31 edges
6. `PrismaService` - 28 edges
7. `ConversationsController` - 26 edges
8. `RedisService` - 24 edges
9. `IConversationsRepository` - 23 edges
10. `compilerOptions` - 23 edges

## Surprising Connections (you probably didn't know these)
- `UIState` --references--> `PostType`  [EXTRACTED]
  frontend/src/shared/model/useUIStore.ts → frontend/src/entities/post/model/types.ts
- `PostCardProps` --references--> `PostType`  [EXTRACTED]
  frontend/src/widgets/post/ui/PostCard.tsx → frontend/src/entities/post/model/types.ts
- `ConversationsRepository` --implements--> `IConversationsRepository`  [EXTRACTED]
  backend/src/messenger/repositories/conversations.repository.ts → backend/src/messenger/interfaces/conversations-repository.interface.ts
- `MessagesRepository` --implements--> `IMessagesRepository`  [EXTRACTED]
  backend/src/messenger/repositories/messages.repository.ts → backend/src/messenger/interfaces/messages-repository.interface.ts
- `AuthResponse` --references--> `UserProfile`  [EXTRACTED]
  frontend/src/features/auth/api/authApi.ts → frontend/src/entities/profile/model/types.ts

## Import Cycles
- None detected.

## Communities (145 total, 53 thin omitted)

### Community 0 - "RequestUser"
Cohesion: 0.06
Nodes (48): ApiParam, CurrentUser, LoginDto, ApiProperty, IsEmail, IsString, MinLength, Transform (+40 more)

### Community 1 - "CreateCommentDto"
Cohesion: 0.05
Nodes (39): CommentsController, ApiBody, ApiOperation, ApiResponse, ApiTags, Body, Controller, Delete (+31 more)

### Community 2 - "followers.service.ts"
Cohesion: 0.06
Nodes (35): GetFollowersQueryDto, IsInt, IsOptional, IsString, Max, Min, Type, FollowersController (+27 more)

### Community 3 - "UsersService"
Cohesion: 0.06
Nodes (28): CreateUserDto, ApiPropertyOptional, IsEmail, IsOptional, IsString, MaxLength, MinLength, Transform (+20 more)

### Community 4 - "AuthService"
Cohesion: 0.07
Nodes (30): AuthController, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, Body, Controller, HttpCode (+22 more)

### Community 5 - "MessengerGateway"
Cohesion: 0.08
Nodes (14): HealthController, ApiOperation, ApiResponse, ApiTags, Controller, Get, MessengerGateway, ConnectedSocket (+6 more)

### Community 6 - ".upload"
Cohesion: 0.08
Nodes (28): ApiConsumes, AvatarsController, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, Controller (+20 more)

### Community 7 - "SidebarMenu.tsx"
Cohesion: 0.09
Nodes (30): useCurrentUser(), authApi, FindAccountPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, AccountSwitcherMenuItem(), AccountSwitcherMenuItemProps (+22 more)

### Community 8 - "useUIStore.ts"
Cohesion: 0.11
Nodes (17): App(), CommentType, CommentItem(), baseComment, CommentForm(), CommentModal(), post, fillValidNameAndUsername() (+9 more)

### Community 9 - "messages.service.ts"
Cohesion: 0.17
Nodes (32): IsValidMessage(), AttachmentDto, ConversationIdDto, DeleteMessageDto, EditMessageDto, ForwardMessageDto, GetMessagesQueryDto, MarkReadDto (+24 more)

### Community 10 - "CreatePost.tsx"
Cohesion: 0.08
Nodes (17): MediaDraft, PollOptionDraft, AddEmojiButton(), AddEmojiButtonProps, EmojiPicker, AddFileButton(), AddFileButtonProps, AddGifButton() (+9 more)

### Community 11 - "post/api/postsApi.ts"
Cohesion: 0.15
Nodes (16): FeedPage, PollData, PollOptionResult, PostMedia, PostType, MediaCarousel(), PostMedia(), VideoPlayer() (+8 more)

### Community 12 - "ConversationsService"
Cohesion: 0.13
Nodes (5): ConversationsService, Inject, Injectable, ConversationView, IConversationsRepository

### Community 13 - "devDependencies"
Cohesion: 0.06
Nodes (33): devDependencies, eslint-config-prettier, @eslint/eslintrc, eslint-plugin-prettier, @nestjs/cli, @nestjs/schematics, @nestjs/testing, source-map-support (+25 more)

### Community 14 - "IMessagesRepository"
Cohesion: 0.15
Nodes (5): MessageView, IMessagesRepository, MessagesService, Inject, Injectable

### Community 15 - "scripts"
Cohesion: 0.06
Nodes (31): scripts, build, clean, clean:prune, dev, dev:backend, dev:frontend, docker:clean (+23 more)

### Community 16 - "EditProfileModal.tsx"
Cohesion: 0.15
Nodes (16): userApi, UserProfile, followApi, FollowListPage, FollowUserSummary, ProfileFormValues, profileSchema, EditProfileModal() (+8 more)

### Community 17 - "devDependencies"
Cohesion: 0.07
Nodes (29): @babel/core, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, @babel/core, eslint-plugin-react-hooks, eslint-plugin-react-refresh, jsdom (+21 more)

### Community 18 - "conversations.service.ts"
Cohesion: 0.22
Nodes (22): AddMembersDto, CreateDirectConversationDto, CreateGroupConversationDto, MuteConversationDto, PromoteMemberDto, SetNicknameDto, SetThemeDto, TransferOwnershipDto (+14 more)

### Community 19 - "devDependencies"
Cohesion: 0.09
Nodes (23): @commitlint/cli, @commitlint/config-conventional, concurrently, conventional-changelog-conventionalcommits, husky, @lhci/cli, lint-staged, devDependencies (+15 more)

### Community 20 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+14 more)

### Community 21 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+14 more)

### Community 22 - "Profile.tsx"
Cohesion: 0.18
Nodes (11): postsApi, PollVoterGroup, useUserPosts(), useUserReposts(), useUserByUsername(), ProfilePage(), POLL_VOTERS_KEY, USER_POSTS_KEY (+3 more)

### Community 23 - "dependencies"
Cohesion: 0.10
Nodes (21): argon2, @aws-sdk/client-s3, dependencies, argon2, @aws-sdk/client-s3, class-transformer, ioredis, @nestjs/jwt (+13 more)

### Community 24 - "ConversationsRepository"
Cohesion: 0.11
Nodes (3): ConversationWithDetails, ConversationsRepository, Injectable

### Community 25 - "MessagesRepository"
Cohesion: 0.13
Nodes (3): MessageWithDetails, MessagesRepository, Injectable

### Community 26 - ".editPost"
Cohesion: 0.20
Nodes (15): PostsController, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 27 - "compilerOptions"
Cohesion: 0.10
Nodes (20): storybook, compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution (+12 more)

### Community 28 - "app.module.ts"
Cohesion: 0.11
Nodes (17): AuthModule, Module, AvatarsModule, Module, CommentsModule, Module, validateEnv(), FollowersModule (+9 more)

### Community 29 - "PostsService"
Cohesion: 0.17
Nodes (5): PostResponseDto, ApiProperty, ApiPropertyOptional, PostsService, Injectable

### Community 30 - "App.tsx"
Cohesion: 0.16
Nodes (11): usePostsFeed(), SkeletonFeed(), SkeletonPostCardProps, useCreatePost(), PostMenu(), PostMenuProps, FeedPage(), FEED_KEY (+3 more)

### Community 31 - "RegisterForm.test.tsx"
Cohesion: 0.14
Nodes (10): mockedUseAuthMutations, ForgotPasswordPage(), renderForgotPasswordPage(), LoginPage(), mockedUseAuthMutations, renderLoginPage(), RegisterPage(), mockedUseAuthMutations (+2 more)

### Community 32 - "Avatar.tsx"
Cohesion: 0.17
Nodes (13): useFollowList(), useFollowMutation(), useRemoveFollowerMutation(), FollowButton(), UserListModal(), UserListModalProps, Avatar(), AvatarProps (+5 more)

### Community 33 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+11 more)

### Community 34 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, db:generate, db:migrate, db:studio, format, lint, lint:fix (+11 more)

### Community 35 - "RedisService"
Cohesion: 0.13
Nodes (8): Inject, REDIS_CLIENT, RedisModule, Global, Module, RedisService, Inject, Injectable

### Community 36 - "PrismaService"
Cohesion: 0.17
Nodes (9): HealthStatus, attachmentFields, conversationInclude, messageInclude, participantInclude, reactionFields, userSnapshot, PrismaService (+1 more)

### Community 37 - "posts.service.ts"
Cohesion: 0.24
Nodes (5): PostWithFollowing, IPostRepository, POSTS_REPOSITORY, PostsRepository, Injectable

### Community 38 - "RegisterForm.tsx"
Cohesion: 0.17
Nodes (9): useCheckUsername(), RegisterFields, registerSchema, MONTHS, RegisterForm(), YEARS, useDebounce(), Input (+1 more)

### Community 39 - "LoginPage.tsx"
Cohesion: 0.23
Nodes (6): HeroSection(), AuthFooter(), Button(), ButtonProps, GlassCard(), GlassCardProps

### Community 40 - "dependencies"
Cohesion: 0.13
Nodes (15): axios, emoji-picker-react, dependencies, axios, emoji-picker-react, react, socket.io-client, tailwindcss (+7 more)

### Community 41 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, build:storybook, dev, format, lint, lint:fix, preview (+6 more)

### Community 42 - "ForgotPasswordPage.tsx"
Cohesion: 0.29
Nodes (6): FoundUserResponse, FindAccount(), FindAccountProps, ResetMethod(), ResetMethodProps, user1

### Community 43 - "likes.module.ts"
Cohesion: 0.26
Nodes (6): ILikesRepository, LIKES_REPOSITORY, LikesModule, Module, LikesRepository, Injectable

### Community 44 - "LoginForm.tsx"
Cohesion: 0.26
Nodes (7): AuthResponse, useAuthMutations(), LoginFields, loginSchema, LoginForm(), LoginFormProps, mockedUseAuthMutations

### Community 45 - "ReportDetailsModal.tsx"
Cohesion: 0.19
Nodes (9): api, reportApi, SubmitReportPayload, AREA_OPTIONS, ReportDetailsModal(), ReportDetailsModalProps, Select, SelectProps (+1 more)

### Community 46 - "messenger.mapper.ts"
Cohesion: 0.21
Nodes (6): AttachmentView, PaginatedMessages, ParticipantView, ReactionSummary, UserSnapshot, ParticipantWithUser

### Community 47 - "checkoutApi.ts"
Cohesion: 0.26
Nodes (6): checkoutApi, CheckoutResponse, useCheckout(), CheckoutButton(), CheckoutProps, checkoutMock

### Community 48 - "package.json"
Cohesion: 0.17
Nodes (11): engines, node, npm, license, name, packageManager, private, type (+3 more)

### Community 49 - "overrides"
Cohesion: 0.17
Nodes (12): overrides, js-yaml, lucide-react, multer, nanoid, postcss, react-router, socket.io-parser (+4 more)

### Community 50 - "validate-eol.js"
Cohesion: 0.23
Nodes (11): __dirname, __filename, getTrackedFiles(), hasCRLF(), IGNORED_DIRS, IGNORED_FILES, isTextFile(), main() (+3 more)

### Community 51 - "backend/package.json"
Cohesion: 0.18
Nodes (10): author, description, license, name, overrides, js-yaml, multer, uuid (+2 more)

### Community 52 - ".addLike"
Cohesion: 0.25
Nodes (9): LikesController, ApiOperation, ApiResponse, ApiTags, Controller, Delete, Param, Post (+1 more)

### Community 53 - "src/main.ts"
Cohesion: 0.24
Nodes (6): AppModule, Module, bootstrap(), createNestServer(), handler(), logger

### Community 54 - "allowScripts"
Cohesion: 0.20
Nodes (10): allowScripts, argon2, esbuild, msgpackr-extract, msw, prisma, @prisma/client, @prisma/engines (+2 more)

### Community 55 - "collectCoverageFrom"
Cohesion: 0.22
Nodes (9): collectCoverageFrom, !**/*.decorator.ts, !**/*.dto.ts, !**/*.guard.ts, !**/*.interface.ts, !**/main.ts, !**/*.module.ts, !**/*.strategy.ts (+1 more)

### Community 56 - "CreatePostDto"
Cohesion: 0.22
Nodes (8): CreatePostDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, IsUrl, Transform

### Community 57 - "clean.js"
Cohesion: 0.31
Nodes (8): __dirname, dirSize(), __filename, formatSize(), main(), removeDir(), rootDir, TARGETS

### Community 58 - "EnvironmentVariables"
Cohesion: 0.25
Nodes (8): EnvironmentVariables, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength

### Community 59 - "EditPostDto"
Cohesion: 0.25
Nodes (7): EditPostDto, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, IsUrl, Transform

### Community 60 - "GetPostsQueryDto"
Cohesion: 0.25
Nodes (7): GetPostsQueryDto, IsInt, IsOptional, IsString, Max, Min, Type

### Community 61 - "exclude"
Cohesion: 0.25
Nodes (7): exclude, extends, test, dist, node_modules, **/*spec.ts, ./tsconfig.json

### Community 62 - "frontend/package.json"
Cohesion: 0.25
Nodes (7): name, overrides, uuid, vite, private, type, version

### Community 63 - "vercel.json"
Cohesion: 0.25
Nodes (7): buildCommand, framework, headers, installCommand, outputDirectory, rewrites, $schema

### Community 64 - "jest"
Cohesion: 0.29
Nodes (7): jest, coverageDirectory, rootDir, testEnvironment, testRegex, transform, ^.+\\.(t|j)s$

### Community 65 - "AllExceptionsFilter"
Cohesion: 0.29
Nodes (4): AllExceptionsFilter, ErrorResponseFormat, Catch, SentryExceptionCaptured

### Community 67 - "LikesService"
Cohesion: 0.29
Nodes (3): LikesService, Inject, Injectable

### Community 68 - "main.tsx"
Cohesion: 0.38
Nodes (4): queryClient, initSentry(), ErrorFallback(), ErrorFallbackProps

### Community 69 - "lint-staged"
Cohesion: 0.29
Nodes (7): lint-staged, backend/src/**/*.ts, frontend/src/**/*.{ts,tsx}, npm exec -w backend -- eslint --fix, npm exec -w backend -- prettier --write, npm exec -w frontend -- eslint --fix, npm exec -w frontend -- prettier --write

### Community 70 - "check-env.js"
Cohesion: 0.33
Nodes (6): __dirname, __filename, main(), readEnvExample(), rootDir, WORKSPACES

### Community 71 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 72 - "global"
Cohesion: 0.33
Nodes (6): global, branches, functions, lines, statements, coverageThreshold

### Community 73 - "FloatingCards.tsx"
Cohesion: 0.60
Nodes (3): MOCK_NOTIFS, MockNotification, FloatingCards()

### Community 74 - ".prettierrc.json"
Cohesion: 0.33
Nodes (5): endOfLine, printWidth, semi, singleQuote, trailingComma

### Community 75 - "types"
Cohesion: 0.40
Nodes (5): multer, types, node, multer, jest

### Community 76 - "ws-events.ts"
Cohesion: 0.40
Nodes (4): WS_EVENTS, WsEventKey, WsEventType, WsEventValue

### Community 78 - "coverageReporters"
Cohesion: 0.50
Nodes (4): coverageReporters, html, lcov, text

### Community 79 - "moduleFileExtensions"
Cohesion: 0.50
Nodes (4): moduleFileExtensions, js, json, ts

### Community 80 - "include"
Cohesion: 0.50
Nodes (3): include, src/**/*, test/**/*

### Community 81 - "postinstall.js"
Cohesion: 0.50
Nodes (3): __dirname, __filename, prismaBin

### Community 82 - "eslint"
Cohesion: 0.67
Nodes (3): eslint, eslint, eslint

### Community 83 - "@eslint/js"
Cohesion: 0.67
Nodes (3): @eslint/js, @eslint/js, @eslint/js

### Community 84 - "globals"
Cohesion: 0.67
Nodes (3): globals, globals, globals

### Community 85 - "@types/node"
Cohesion: 0.67
Nodes (3): @types/node, @types/node, @types/node

### Community 98 - "PostCard.tsx"
Cohesion: 0.18
Nodes (10): usePollVoters(), PollVotersModal(), PollVotersModalProps, patchPost(), useLikeMutation(), formatRelativeTime(), ExpandableText(), PostCard() (+2 more)

## Knowledge Gaps
- **422 isolated node(s):** `singleQuote`, `semi`, `trailingComma`, `printWidth`, `endOfLine` (+417 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RequestUser` connect `RequestUser` to `CreateCommentDto`, `followers.service.ts`, `UsersService`, `AuthService`, `.upload`, `messages.service.ts`, `conversations.service.ts`, `.addLike`, `.editPost`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `RequestUser` to `CreateCommentDto`, `followers.service.ts`, `UsersService`, `AuthService`, `.upload`, `messages.service.ts`, `conversations.service.ts`, `.addLike`, `.editPost`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `jest`, `prettier`, `supertest`, `ts-node`, `@types/express`, `@types/supertest`, `eslint`, `@eslint/js`, `backend/package.json`, `globals`, `@types/node`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `singleQuote`, `semi`, `trailingComma` to the rest of the system?**
  _422 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RequestUser` be split into smaller, more focused modules?**
  _Cohesion score 0.06011949215832711 - nodes in this community are weakly interconnected._
- **Should `CreateCommentDto` be split into smaller, more focused modules?**
  _Cohesion score 0.05427547363031234 - nodes in this community are weakly interconnected._
- **Should `followers.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06246799795186892 - nodes in this community are weakly interconnected._