#!/usr/bin/env python3
import json


def main():
    with open('cities.json', 'r') as file:
        data = json.load(file)

    for value in data:
        print(f"{value['city_name']},_{value['state_name']}")


if __name__ == "__main__":
    main()
