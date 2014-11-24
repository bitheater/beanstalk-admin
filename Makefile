PROJECT = beanstalk-admin
DEPS = github.com/kr/beanstalk \
github.com/gorilla/mux \
github.com/tv42/slug

BASE_PATH := $(shell pwd)
PUBLIC_PATH := $(BASE_PATH)/server/public
BUILD_PATH := $(PUBLIC_PATH)/dist

GOCMD = go
GOTEST = $(GOCMD) test
GOGET = $(GOCMD) get
GOCLEAN = $(GOCMD) clean
GOBUILD = $(GOCMD) build

all: test build

deps:
	for i in $(DEPS); do $(GOGET) $$i; done

test: deps
	cd $(BASE_PATH)/config; $(GOTEST) -v .

build:
	$(GOBUILD) beanstalk-admin.go

assets:
	cd $(PUBLIC_PATH); npm install

install:
	cp -rf beanstalk-admin /usr/bin/

clean:
	rm -rf $(BUILD_PATH)
	$(GOCLEAN) .
