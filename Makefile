# Define variables
BUILD_DIR = build
DOCS_DIR = docs
CNAME_FILE = CNAME

# Default target
all: build copy

# Run npm build
build:
	npm run build

# Remove docs folder and copy build folder to docs
copy: remove_docs copy_build copy_cname

# Remove the docs directory if it exists
remove_docs:
	rm -rf $(DOCS_DIR)

# Copy build directory to docs
copy_build:
	cp -r $(BUILD_DIR) $(DOCS_DIR)

# Copy CNAME file to docs
copy_cname:
	cp $(CNAME_FILE) $(DOCS_DIR)

# Phony targets
.PHONY: all build copy remove_docs copy_build copy_cname
