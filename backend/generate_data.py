import pandas as pd
import random

def generate_dataset(num_rows=100):
    careers = ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'AI Engineer', 'UI/UX Designer', 'Business Analyst']
    data = []
    
    for _ in range(num_rows):
        career = random.choice(careers)
        # Create realistic correlations Default to random 40-80
        math = random.randint(40, 80)
        prog = random.randint(40, 80)
        comm = random.randint(40, 80)
        create = random.randint(40, 80)
        logic = random.randint(40, 80)
        tech = random.randint(40, 80)
        design = random.randint(40, 80)
        business = random.randint(40, 80)
        
        # Boost specific skills based on career
        if career == 'Software Engineer':
            prog = random.randint(80, 100)
            logic = random.randint(70, 100)
            tech = random.randint(80, 100)
            design = random.randint(30, 70)
        elif career == 'Data Scientist':
            math = random.randint(85, 100)
            prog = random.randint(70, 95)
            logic = random.randint(80, 100)
            tech = random.randint(70, 100)
        elif career == 'Cybersecurity Analyst':
            logic = random.randint(85, 100)
            tech = random.randint(85, 100)
            prog = random.randint(60, 90)
        elif career == 'AI Engineer':
            math = random.randint(85, 100)
            prog = random.randint(85, 100)
            logic = random.randint(85, 100)
            tech = random.randint(90, 100)
        elif career == 'UI/UX Designer':
            create = random.randint(85, 100)
            design = random.randint(85, 100)
            tech = random.randint(50, 80)
            prog = random.randint(30, 60)
        elif career == 'Business Analyst':
            comm = random.randint(80, 100)
            business = random.randint(85, 100)
            logic = random.randint(70, 90)
            prog = random.randint(30, 60)
            
        data.append([math, prog, comm, create, logic, tech, design, business, career])
        
    df = pd.DataFrame(data, columns=['Math_Score', 'Programming_Skill', 'Communication_Skill', 'Creativity', 'Logical_Thinking', 'Interest_Tech', 'Interest_Design', 'Interest_Business', 'Career'])
    df.to_csv('dataset.csv', index=False)
    print("dataset.csv generated successfully.")

if __name__ == "__main__":
    generate_dataset(150)
