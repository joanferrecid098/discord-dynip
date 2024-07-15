build_image_dev:
	docker build . -t discord-dynip

run_image_dev:
	docker run --name discord-dynip discord-dynip