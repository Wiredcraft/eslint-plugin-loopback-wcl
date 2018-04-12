BIN = ./node_modules/.bin

test:
	@$(BIN)/mocha tests/**/*.js
