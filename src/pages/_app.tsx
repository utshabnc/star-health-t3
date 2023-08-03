// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NavFoot } from "../components/NavFoot";
import Head from "next/head";

{
  /* <React.StrictMode>
    <BrowserRouter>
      <NavFoot>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='doctor/:id' element={<DoctorDetails />} />
          <Route path='doctor/:id/reviews' element={<DoctorReviews />} />
          <Route path='drug/:id' element={<DrugDetails />} />
          <Route path='manufacturer/:id' element={<ManufacturerDetails />} />
          <Route path='state/:id' element={<StateDetails />} />
          <Route path='search' element={<StateDetails />} />

        </Routes>
      </NavFoot>
    </BrowserRouter>
  </React.StrictMode> */
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  let domLoading: any = null;
  let loadedNodes;
  const nodeCheck = [];
  const checkEdged = [];
  let graphPreviouslyLoaded = false;
  const loadedNodesId = {};
  const loadedSubNodesId = {};

  setTimeout(() => {

    const loadVisLib = setTimeout(() => {

      if(document != undefined){

        const visLib = document.createElement('script');
        visLib.src = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
        document.getElementsByTagName('head')[0]?.appendChild(visLib);

        domLoading = document.getElementById('domLoading')?.innerHTML;
        if(document.getElementById('initialLoadingSpinner'))
          document.getElementById('initialLoadingSpinner').style.display = 'none';
        
        if(document.getElementById('headMapPlaceholder'))
          document.getElementById('headMapPlaceholder').style.display = 'block';

        document.addEventListener('click', (e: any) => {
          const clickedComponent = e?.target;
          
          if(clickedComponent?.type == 'checkbox'){
            callUpdateGraph(clickedComponent);
          }
          
          if(clickedComponent?.id == 'graphLauncher'){
            console.log(clickedComponent?.id);
            if(graphPreviouslyLoaded){

              loadedNodes.nodes.clear();
              loadedNodes.edges.clear();
            }else{
              graphPreviouslyLoaded = true;
            }
            document.getElementById('graphPlaceholder').innerHTML = domLoading;
            loadGraphToDisease('10q26-deletion-syndrome');
          }

          if(
            clickedComponent?.classList[0]?.trim() == 'icon_cancel' &&
            clickedComponent?.classList[1]?.trim() == 'closeIcon'
            ){
              const removeDisease = document.getElementById('removedDisease')?.innerHTML;
              const diseaseToRemove = `${removeDisease?.trim()}`;
              for(const nodeId of Object.keys(loadedNodesId[diseaseToRemove])){
                loadedNodes.nodes.remove({ id: nodeId });
                for(const subNodeId of Object.keys(loadedSubNodesId[nodeId])){
                  loadedNodes.nodes.remove({ id: subNodeId });
                }                
              }
              loadedNodes.nodes.remove({id: diseaseToRemove})
            }

        });
        clearInterval(loadVisLib);
        
      }

    }, 2000);

  }, 5000);

  function loadGraphToDisease(diseaseName = null){

    let diseaseParam = diseaseName?.toString().split('/');
    if(diseaseName){
      diseaseParam = diseaseParam[diseaseParam?.length - 1];
    }
    
    const urlDisease = `/api/genetics/condition/${diseaseParam}`;
    
    fetch(urlDisease).then(async (result) => {

      let disease = await result.json();
      disease = disease?.condition;
      const diseaseRelations: any = disease['related-gene-list'];
      
      const allNodes = [];
      DiseaseRelationParser.resetTotals();

      for(const relation of (diseaseRelations || [])){
        const _geneId = relation['related-gene']['gene-symbol'];
        let _urlComplement = `chromosome/${_geneId}`;
        
        if(isNaN(_geneId)) _urlComplement = `gene/${_geneId.toString().toLowerCase()}`
        const _urlGenes = `/api/genetics/${_urlComplement}`;
        
        try{
          const _geneRequest = await fetch(_urlGenes);
          const _geneResult = await _geneRequest.json();
          let _parsedResult: any;
          
          if(_geneResult?.gene) _parsedResult = DiseaseRelationParser.genes(_geneResult, _geneId, diseaseParam);
          if(_geneResult?.chromosome) _parsedResult = DiseaseRelationParser.chromosomes(_geneResult, _geneId, diseaseParam);
          allNodes.push(..._parsedResult.chromosomeNodes);

        }catch(err){}
      }

      const chromosomeEdges = [...allNodes].map((edge) => {
        checkEdged.push(`${edge.linkNode}|${edge.id}`);
        return { from: edge.linkNode, to: edge.id, }
      });
      allNodes.push({ id: diseaseParam, label: `${disease?.name}`, group: 0, value: 7 });
      const nodes = [];
      for(const node of allNodes){
        if(!nodeCheck.includes(node.id)){
          nodeCheck.push(node.id);
          nodes.push(node); 
        }
      }

      renderGraph({ nodes: nodes, edges: [...chromosomeEdges]});

    });
    
  }

  function addNodeToGraph(diseaseName = null){

    let diseaseParam = diseaseName?.toString().split('/');
    if(diseaseName){
      diseaseParam = diseaseParam[diseaseParam?.length - 1];
    }
    
    const urlDisease = `/api/genetics/condition/${diseaseParam}`;
    
    fetch(urlDisease).then(async (result) => {

      let disease = await result.json();
      disease = disease?.condition;
      const diseaseRelations: any = disease['related-gene-list'];
      
      const allNodes = [];

      for(const relation of (diseaseRelations || [])){
        const _geneId = relation['related-gene']['gene-symbol'];
        let _urlComplement = `chromosome/${_geneId}`;
        
        if(isNaN(_geneId)) _urlComplement = `gene/${_geneId.toString().toLowerCase()}`
        const _urlGenes = `/api/genetics/${_urlComplement}`;
        
        try{
          const _geneRequest = await fetch(_urlGenes);
          const _geneResult = await _geneRequest.json();
          let _parsedResult: any;
          
          if(_geneResult?.gene) _parsedResult = DiseaseRelationParser.genes(_geneResult, _geneId, diseaseParam);
          if(_geneResult?.chromosome) _parsedResult = DiseaseRelationParser.chromosomes(_geneResult, _geneId, diseaseParam);
          allNodes.push(..._parsedResult.chromosomeNodes);

        }catch(err){}
      }

      allNodes.forEach((edge) => {
        if(!checkEdged.includes(`${edge.linkNode}|${edge.id}`)){
          checkEdged.push(`${edge.linkNode}|${edge.id}`);
          loadedNodes.edges.add({ from: edge.linkNode, to: edge.id, });
        }
      });
      loadedNodes.nodes.add({ id: diseaseParam, label: `${disease?.name}`, group: 0, value: 7 });
      const middleNodes = allNodes.filter(node => node.value == 5);
      const remainingNodes = allNodes.filter(node => node.value == 3);

      for(const node of middleNodes) {
        if(!nodeCheck[node.id]) {
          if(!loadedNodesId.hasOwnProperty(`${node.linkNode}`)){
            loadedNodesId[`${node.linkNode}`] = {};
          } 
          loadedNodesId[`${node.linkNode}`][`${node.id}`] = null;
          try{
            loadedNodes.nodes.add(node);
          }catch(err){}
          nodeCheck.push(node.id);
        }
      }
      const obj1 = {};
      for(const node of remainingNodes) {
        if(!nodeCheck[node.id]) {
          if(!loadedSubNodesId.hasOwnProperty(`${node.linkNode}`)){
            loadedSubNodesId[`${node.linkNode}`] = {};
          }
          try{
            loadedNodes.nodes.add(node);
          }catch(err){}
          nodeCheck.push(node.id);
          loadedSubNodesId[`${node.linkNode}`][`${node.id}`] = null;
          obj1[node.id] = '';
          
        }
      }

      console.log(loadedNodesId);
      console.log(loadedSubNodesId);
      

    });
    
  }

  function renderGraph(data: object){

    const container = document.getElementById("graphPlaceholder");
    const options = {
      nodes: {
        shape: "dot", size: 16,
        font: { color: 'black' }
      },
      groups:{
        gene: {color: { background: 'red', border: 'darkred' }},
        chromo: { color: { background: '#9998d7', border: '#504ed1' }},
        middle: { color: { background: 'yellow', border: 'darkorange' }}
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    };

    loadedNodes = {
      nodes: new vis.DataSet(data.nodes),
      edges: new vis.DataSet(data.edges)
    };
    new vis.Network(container, loadedNodes, options);
    document.getElementById('totalGenesPlaceholder').innerHTML = globals.totalGenes;
    document.getElementById('totalChromosPlaceholder').innerHTML = globals.totalChromosomes;

  }

  type DisieaseRelationType = {
    chromosomes: Array<string> | string, 
    chromosomeNodes: Array<object> | string
  }

  const globals = {
    relationId: 0,
    totalGenes: 0,
    totalChromosomes: 0
  }

  class DiseaseRelationParser {

    static resetTotals(){
      globals.totalGenes = 0;
      globals.totalChromosomes = 0;
    }

    static addOneGenes(){
      globals.totalGenes++;
      return ++globals.relationId;
    }

    static addOneChromo(){
      globals.totalChromosomes++;
      return ++globals.relationId;
    }

    static genes(dataSource: any, linkNode: any, diseaseLink: any): DisieaseRelationType {
      const chromosomes = dataSource['gene']['related-health-condition-list'] ?? [];
      const chromosomeNodes = [...chromosomes].map(gene => (
        {
          id: `${gene['related-health-condition']?.name}`, 
          label: `${gene['related-health-condition']?.name}`, 
          group: 'gene', 
          linkNode,
          value: 3
        }
      ));

      const middle = {id: linkNode, label: linkNode, group: 'middle', linkNode: diseaseLink || 0, value: 5};
      chromosomeNodes.push(middle);

      DiseaseRelationParser.totalGenes = chromosomeNodes.length;
      return { chromosomes, chromosomeNodes }
    }

    static chromosomes(dataSource: any, linkNode: any, diseaseLink: any) : DisieaseRelationType {
      let chromosomes = dataSource['chromosome']['chromosome-summary']['related-health-condition-list']['related-health-condition'] ?? [];
      if(chromosomes?.name)
        chromosomes = [chromosomes];
      const chromosomeNodes = [...chromosomes].map(chromo => (
          {
            id: chromo?.name?._text, 
            label: `${chromo?.name?._text}`, 
            group: 'chromo', 
            linkNode,
            value: 3
          }
      ));

      const middle = {id: linkNode, label: linkNode, group: 'middle', linkNode: diseaseLink || 0, value: 5};
      chromosomeNodes.push(middle);

      DiseaseRelationParser.totalChromosomes = chromosomeNodes.length;
      return { chromosomeNodes }
    }

  }

  function callUpdateGraph(clickedComponent){
    const checkParent = clickedComponent?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;
    if(checkParent.id == 'diseaseFilterContainer'){
      const disease = document.getElementById('filteredDisease')?.innerHTML?.trim();
      addNodeToGraph(disease);
    }
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>StarHealth</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
      </Head>
      <NavFoot>
        <Component {...pageProps} />
        <ToastContainer />
      </NavFoot>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
