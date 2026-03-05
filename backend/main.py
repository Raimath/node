from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Dict[Any, Any] = Body(...)):
    nodes = pipeline.get('nodes', [])
    edges = pipeline.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # DAG Check using Kahn's Algorithm
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1
            
    queue = [n for n in in_degree if in_degree[n] == 0]
    count = 0
    
    while queue:
        u = queue.pop(0)
        count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    is_dag = count == num_nodes
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
