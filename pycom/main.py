from network import WLAN
from network import Sigfox
import machine
from machine import Pin
import socket
from lis2hh12 import LIS2HH12
import time
import json
import pycom
from threading import Thread

accelerometer = LIS2HH12()

def init_socket():
    sigfox = Sigfox(mode=Sigfox.SIGFOX, rcz=Sigfox.RCZ1)
    s = socket.socket(socket.AF_SIGFOX, socket.SOCK_RAW)
    s.setblocking(True)
    s.setsockopt(socket.SOL_SIGFOX, socket.SO_RX, False)
    return s

def init_temp():
    p_out = Pin('G6', mode=Pin.OUT)
    p_out.value(1)

    adc = machine.ADC()
    pin = adc.channel(pin='G3')
    return pin

def create_thread_for_flash():
    thread = Thread(target=start_flashing, args=(10,))
    thread.start()

def start_flashing(iterations):
    for i in range(iterations):
        turn_on()
        time.sleep(1)
        turn_off
        time.sleep(1)

def turn_on():
    pycom.rgbled(0x007f00)

def turn_off():
    pycom.rgbled(0x000000)

def read_temp():
    val = pin.voltage()
    return convert_to_temp(val)

def convert_to_temp(pin_value):
    return (pin_value - 500) / 10

def watch_movements(duration, threshold):
    start, end = time.time()
    sipActive = False
    sips = 0
    while end - start < duration:
        if sipActive:
            if not isSip(threshold):
                sipActive = False
                sips += 1
        else:
            if isSip(threshold):
                sipActive = True
        end = time.time()
    return sips

def isSip(threshold):
    return get_roll_diff > threshold or get_pitch_diff > threshold

def get_acceleration():
    return accelerometer.acceleration()

def get_roll():
    return accelerometer.roll()

def get_roll_diff():
    return get_roll() - init_roll

def get_pitch():
    return accelerometer.pitch()

def get_pitch_diff():
    return get_pitch() - init_pitch

pycom.heartbeat(False)
pin = init_temp()
socket = init_socket()
init_roll = get_roll()
init_pitch = get_pitch()

while True:
    sips = watch_movements(duration=10, threshold=10)   # Duration: Seconds     Threshold: Degrees
    temp = read_temp()
    #socket.send(f"{temp} {sips}")
    print(f"Message sent: {temp} {sips}")
    