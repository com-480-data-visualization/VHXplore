#!/usr/bin/env python3
import pandas as pd
import os

def main():
    input_file = 'alldata.csv'
    mapping_file = 'mapping.csv'
    output_file = 'alldata_processed.csv'

    
    df = pd.read_csv(input_file)

   
    try:
        mapping_df = pd.read_csv(mapping_file)
        mapping_dict = dict(zip(mapping_df['old_name'], mapping_df['new_name']))
        df['lang'] = df['lang'].map(mapping_dict).fillna(df['lang'])
    except FileNotFoundError:
        print(f"Warning: '{mapping_file}' not found. 'lang' column will not be renamed.")

    if 'status' in df.columns:
        df = df[df['status'] >= 0]
    else:
        print("Warning: 'status' column not found. No rows filtered.")

   
    cols = ['size(B)', 'cpu-time(s)', 'mem(KB)']
    for col in cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    grouped = df.groupby(['name', 'lang', 'n'])[cols].agg(['mean', 'std']).reset_index()

    grouped.columns = ['name', 'lang', 'n'] + [f"{col}_{stat}" for col in cols for stat in ['mean', 'std']]

    ordered_cols = ['name', 'lang', 'n',
                    'size(B)_mean', 'cpu-time(s)_mean', 'mem(KB)_mean',
                    'size(B)_std', 'cpu-time(s)_std', 'mem(KB)_std']
    grouped = grouped[ordered_cols]

    grouped.to_csv(output_file, index=False)
    print(f"Processed dataset saved to {output_file}")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    main()
