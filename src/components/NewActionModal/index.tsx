import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState, ChangeEvent, useEffect } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import api from '../../services/api';
import { Form } from './styles';
import { Select } from '../Select';
import { SelectCategoryAction } from '../SelectCategoryAction';
import { SelectLesson } from '../SelectLesson';
import { SelectContent } from '../SelectContent';
import { SelectSubject } from '../SelectSubject';

interface IAction {
  id: number;
  name: string;
  description: string;
 
}

interface IContent {
  id: number;
  name: string;
  description: string;
 
}

interface ILesson {
  id: number;
  title: string;
  description: string;
 
}

interface ICreateActionData {
  name: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAction: (action: Omit<IAction, 'id' | 'available'>) => void;
 
}

interface ISubject {
  id: number;
  code: string;
  name: string;
  semester: string;
}

const NewActionModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAction,
  
}) => {
  const formRef = useRef<FormHandles>(null);

  const [selectAction, setSelectAction] = useState();
  const [selectLesson, setSelectLesson] = useState();
  const [selectTypeContext, setSelectTypeContext] = useState();
  const [selectTypeContent, setSelectTypeContent] = useState();
  const [selectContent, setSelectContent] = useState();
  const [selectSubject, setSelectSubject] = useState();

  
  const [context, setContext] = useState('0');
  const [actions, setActions] = useState<IAction[]>([]);
  const [contents, setContents] = useState<IContent[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const typeContexts = [
    {id: 1, key: 'REVISAO', name: "Revisão"},
    {id: 2, key: 'RECOMENDACAO', name: "Recomendação"},
    {id: 3, key: 'FEEDBACK', name: "Feedback"}
  ];

  const typeActions = [
    {id: 1, key: 'QUIZ', name: "Entregar Quiz"},
    {id: 2, key: 'TESTE', name: "Entregar Teste"},
    {id: 3, key: 'MATERIAL', name: "Material de estudo"}
  ];

  const handleSubmit = useCallback(
    async (data: ICreateActionData) => {
      await handleAddAction(data);
      setIsOpen();
    },
    [handleAddAction, setIsOpen],
  ); 

  function handleSelectedAction(event: ChangeEvent<HTMLSelectElement>){
    const action = event.target.value;

    setSelectAction(action);
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>){
    const context = event.target.value;

    loadActions(context);

   

    setContext(context);
  }

  function handleSelectedContent(event: ChangeEvent<HTMLSelectElement>){
    const content = event.target.value;

    loadContents(content);
  }

  function handleSelectedLesson(event: ChangeEvent<HTMLSelectElement>){
    const lesson = event.target.value;
   
    setSelectLesson(lesson);
  }

  async function loadActions(context: string): Promise<void> {
    const response = await api.get(`categoryAction?context=${context}`);

    setActions(response.data.categoryActions);
  }

  async function loadContents(content: string): Promise<void> {
    const response = await api.get(`contents?type=${content}`);

    setContents(response.data);
  }

  useEffect(() => {
    api.get('subject').then(response => {
      setSubjects(response.data);
      loadLessons(response.data)
    });

   },[]);

  async function loadLessons(subject: string): Promise<void> {
    const response = await api.get(`lesson?subject$=${subject}`);

    setLessons(response.data);
  }

  function handleSelectedSubject(event: ChangeEvent<HTMLSelectElement>){
    const subject = event.target.value;

    loadLessons(subject);
   
    setSelectSubject(subject);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>    
      <Form className="space-y-4 mb-14 p-2 space-y-2 flex flex-col " ref={formRef} onSubmit={handleSubmit}>
        <h1 className="text-xl mb-4 font-bold">Configurar Ação Programável</h1>

        <div className="flex flex-row space-x-2">
          <Select title="Bot" data={typeContexts} value={selectTypeContext} change={handleSelectedContext}/>
          <SelectCategoryAction title="Tipo" data={actions} value={selectAction} change={handleSelectedAction}/>
        </div>
       
       <hr className="mt-6"/>

        <div className="flex flex-row space-x-2">
          <SelectSubject title="Selecione a materia" data={subjects} value={selectSubject} change={handleSelectedSubject}/>
          <SelectLesson title="Selecione a aula" data={lessons} value={selectLesson} change={handleSelectedLesson}/>
          <Select title="Ação" data={typeActions} value={selectTypeContent} change={handleSelectedContent}/>
         
        </div>

        <hr className="mt-6"/>

        <div className="flex flex-row space-x-2">
          <SelectContent title="Conteúdo" data={contents} value={selectContent} change={handleSelectedContent}/>
          <div className="flex flex-col w-1/2">
            <span className="">Quantidade de dias</span>
            <Input className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" name="name"/>
          </div>
        </div>
        
      
        <button 
          className=" bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md text-white w-36 absolute right-7 bottom-4" 
          type="submit" data-testid="add-action-button">
          <p className="text">Finalizar</p>
        </button>

      </Form>
    </Modal>
  );
};

export default NewActionModal;
