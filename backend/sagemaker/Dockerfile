# Use the latest Ubuntu image as the base
FROM ubuntu:latest

# Install Python 3.9
RUN apt-get update && \
    apt-get install -y python3.9 python3-pip

# Copy your Python script into the container (if you have one)
# COPY your-script.py /your-script.py

# Install Python libraries
RUN pip3 install openai boto3

# Set the default command for the container
CMD ["python3.9"]
