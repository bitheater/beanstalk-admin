PROJECT = beanstalk-admin
DEPS = github.com/kr/beanstalk \
github.com/gorilla/mux \
github.com/tv42/slug

BASE_PATH := $(shell pwd)
BUILD_PATH := $(BASE_PATH)/dist

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

install:
	cp -rf beanstalk-admin /usr/bin/

clean:
	rm -rf $(BUILD_PATH)
	$(GOCLEAN) .
