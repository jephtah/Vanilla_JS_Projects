import numpy as np
from numpy.random import randn
np.random.seed(101)

pd.DataFrame(randn(5,4))

df = pd.DataFrame(randn(5,4), index = 'A B C D E'.split(),
 columns='W X Y Z'.split())


df[df['W']>0]

df[df['W']>0]['Y']  

df[(df['W']>0)|(df['Y']>1)]

df[(df['W']>0) & (df['Y']>0)]


df
    