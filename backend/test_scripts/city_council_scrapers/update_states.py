#!/usr/bin/env python3
# Consider rewriting to not use pandas? large installation for simple script...use beautiful soup instead?
import json
import requests
import pandas as pd
import os

urls = [
    'https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives',
    'https://en.wikipedia.org/wiki/List_of_US_Senators'
]


def rm_if_exists(file):
    if os.path.exists(file):
        os.remove(file)


def scrape_data(url, field, file):
    html = requests.get(url).content
    df_list = pd.read_html(html)
    df = df_list[field]
    df.to_json(file)


def grab_json(jsonFile):
    with open(jsonFile, 'r') as json_file:
        data = json.load(json_file)
    return data


def grab_data(new_reps_data, field):
    data = {}
    for key, value in new_reps_data[field].items():
        data[key] = value
    # Edge case with district formatting
    if field == 'District':
        data = {key: value.split('\u00a0')[0] for key, value in data.items()}
    return data


def grab_new_info(dict, branch, new_reps):
    new_rep_info = {}
    for key, value in dict.items():
        new_rep_info[key] = {'state_name': value, branch: new_reps[key]}
    return new_rep_info


def return_rep_list(new_info, new_rep, branch):
    result = {}
    for key, value in new_info.items():
        state_name = value['state_name']
        rep = value[new_rep]

        if state_name not in result:
            result[state_name] = {'state_name': state_name, branch: []}
        result[state_name][branch].append(rep)
    result_list = list(result.values())
    return result_list


def update_all(states_data, rep_result_list, sen_result_list):
    for state in states_data:
        state_name = state['state_name']
        for result in rep_result_list:
            if result['state_name'] == state_name:
                state['house_delegation'] = result['house_delegation']
        for sen_result in sen_result_list:
            if sen_result['state_name'] == state_name:
                state['senators'] = sen_result['senators']
    # Save the updated states data back to states.json
        with open('states.json', 'w') as json_file:
            json.dump(states_data, json_file, indent=2)


def update_reps():
    rm_if_exists('new_reps.json')
    rm_if_exists('new_sens.json')
    scrape_data(urls[0], 6, 'new_reps.json')
    scrape_data(urls[1], 5, 'new_sens.json')

    # Load json files
    new_reps_data = grab_json('new_reps.json')
    new_sens_data = grab_json('new_sens.json')
    states_data = grab_json('states.json')

    # Grab representatives' data
    new_reps = grab_data(new_reps_data, 'Member')
    districts = grab_data(new_reps_data, 'District')

    # Grab new senators' data
    new_sens = grab_data(new_sens_data, 'Senator')
    states = grab_data(new_sens_data, 'State')
    new_sen_info = grab_new_info(states, 'senator', new_sens)
    new_state_info = grab_new_info(districts, 'representative', new_reps)

    sen_result_list = return_rep_list(new_sen_info, 'senator', 'senators')
    rep_result_list = return_rep_list(new_state_info, 'representative',
                                      'house_delegation')
    update_all(states_data, rep_result_list, sen_result_list)


if __name__ == "__main__":
    update_reps()
    os.remove('new_reps.json')
    os.remove('new_sens.json')
