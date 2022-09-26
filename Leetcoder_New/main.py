import pandas as pd
from matplotlib.pyplot import pie, axis, show


df = pd.read_csv('LC.csv')


sums = df.groupby(df["Categories"])['Categories'].count()

print(sums)
axis('equal')
pie(sums, labels=sums.index, autopct='%1.1f%%')
show()
