import { useRouter } from "next/router";
import { debounce, xor } from "lodash";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Popover } from "react-tiny-popover";
import { formatName, formatLocation } from "../../utils";
import Search from "../../components/Search";
import { HiOutlineSearch } from 'react-icons/hi';
import DoctorDropdown from '../../components/DropDownTables/DoctorDropdown';
import LocationDropdown from '../../components/DropDownTables/LocationDropDown';
import { trpc } from "../../utils/trpc";
import RecommenderCards from "../../components/RecommenderCards";


const RecommenderSearch = () => {

	const { query: querySearch } = useRouter();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [doctor, setDoctor] = useState("");
	const [location, setLocation] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [insurance, setInsurance] = useState("");
	const [payload, setPayload] = useState({});

	useEffect(() => {
		setPayload({
			doctor, location, specialty, insurance
		})
	}, [doctor, location, specialty, insurance])

	const { data: searchResults, refetch: fetchSearchResults } =
		trpc.db.recommender.useQuery(payload ?? "", { enabled: false });

	const { data: specialties } = trpc.db.specialties.useQuery();

	console.log('specialties!!!!')
	console.log(specialties);
	const handleSubmit = () => {
		fetchSearchResults(payload);
	}	

  useEffect(() => {
    const searchParam = querySearch["search"] as string;
		// console.log(searchParam)
    if (searchParam) {
      setDoctor(searchParam);
    }
  }, [querySearch]);

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2) return;
      setIsPopoverOpen(true);
      fetchSearchResults();
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchResults ?? "");
  }, [searchResults]);


	const SearchResults = () => {
    if (!searchResults) return null;
    if (
      searchResults?.doctors?.length === 0 &&
      searchResults?.products?.length === 0
    ) {
      return null;
    }
    return (
      <div style={{ marginLeft: 20 }} className="flex">
        <div
          onClick={() => setIsPopoverOpen(false)}
          className="modal-close absolute top-1 right-0 z-50 mt-4 mr-1 flex cursor-pointer flex-col items-center text-sm"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
				<DoctorDropdown
					rows={[
						// doctors
						...searchResults.map(
							({ id, firstName, lastName, city, state }) => ({
								id,
								name: `${firstName} ${lastName}`,
								location: formatLocation(city, state),
								type: "doctor" as const,
							})
						),
					]}
				/>

													{/* <LocationDropdown
										rows={[
											// products
											...searchResults?.products
												.filter((product) => product.type && product.type.toLowerCase() === "drug") // TODO - enable other products when we have somewhere to display them
												.map(({ id, name }) => ({
													id: id,
													name: name ?? '',
													location: '',
													type: "drug" as const,
												})),
										]}
									/> */}
      </div>
    );
  };



	return (
		<>
		<div className='box-border'>
			<div className='text-center container mt-[20px]'>
			<div className='flex flex-row recommender_search inline-flex p-0 border border-[#CED5DD] b-r-0 rounded-tl-[4px] rounded-bl-[4px] max-w-full '>
					<div className='doctor_search mt-0 relative leading-[0]'>
						<div>
							<div data-dropdown-active="false" className=''>
								<div className='relative h-[100%]'>
									<div>
										<Popover
											isOpen={isPopoverOpen}
											positions={["bottom"]} // preferred positions by priority
											// content={<SearchResults />}
											onClickOutside={() => setIsPopoverOpen(false)}
										>
											<input className='px-[16px] w-[287px] h-[45px] font-custom text-[14px] leading-[20px] tracking-normal normal-case' type="text" name="doctor" data-test="pps-text-box-input" 
												value={doctor} placeholder="Select or Search Doctor..." onChange={({target}) => setDoctor(target.value)} 
											/>
										</Popover>
									</div>
									<div>
										<div className='cancel-button'></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='border-solid border-l-[1px] location_search mt-0 relative leading-[0]'>
						<div>
							<div data-dropdown-active="false" className=''>
								<div className='relative h-[100%]'>
									<div>
										<input className='h-[45px] px-[16px] w-[287px] font-custom text-[14px] leading-[20px] tracking-normal normal-case' type="text" name="location" data-test="pps-text-box-input" 
											 value={location} placeholder="Zip code or City..." onChange={({target}) => setLocation(target.value)} 
										/>
									</div>
									<div>
										<div className='cancel-button'></div>
									</div>
									

								</div>

							</div>
							
						</div>
					</div>

					<div className='border-solid border-l-[1px] speciality_search mt-0 relative leading-[0]'>
						<div>
							<div data-dropdown-active="false" className=''>
								<div className='relative h-[100%]'>
									<div>
										<input className='h-[45px] px-[16px] w-[287px] font-custom text-[14px] leading-[20px] tracking-normal normal-case' type="text" name="specialty" data-test="pps-text-box-input" 
											value={specialty} placeholder="Choose Specialty..."  onChange={({target}) => setSpecialty(target?.value)} 
										/>
									</div>
									<div>
										<div className='cancel-button'></div>
									</div>
									{/* <DetailsTable 
										rows={[]} 
									/> */}
									

								</div>

							</div>
							
						</div>
					</div>

					<div className='border-solid border-l-[1px] insurance_search mt-0 relative leading-[0]'>
						<div>
							<div data-dropdown-active="false" className=''>
								<div className='relative h-[100%]'>
									<div>
										<input className='h-[45px] px-[16px] w-[287px] font-custom text-[14px] leading-[20px] tracking-normal normal-case' name="insurance" type="text" data-test="pps-text-box-input" 
											value={insurance} placeholder="Insurance Type..." onChange={({target}) => setInsurance(target?.value)} 
										/>
									</div>
									<div>
										<div className='cancel-button'></div>
									</div>
									{/* <DetailsTable 
										rows={[]} 
									/> */}
									

								</div>

							</div>
							
						</div>
					</div>

					<div className='leading-[0]' >
						<button className='inline-flex items-center justify-center h-[100] py-[11px] mt-0 w-[47px] bg-yellow-200 rounded-tr-[4px] rounded-br-[4px]'
							onClick={() => handleSubmit()}
						>
							<HiOutlineSearch size={21} />
						</button>
						
					</div>

				</div>
			</div>

		</div>
		
		{/* <div className="flex w-full h-[90%] justify-center"> */}
			{/* <div className='flex min-h-[100%] flex-col overflow-scroll w-[95%] ml-5 p-1'> */}
					{/* {!error ? <DirectoryCards filterParams={filterParams} data={data} /> : <div>Try adjusting your search filter. No results were found</div>} */}
					{/* {<RecommenderCards search={search as string} searchResults={searchResults} filterParams={filterParams} data={data} />}  */}

			{/* </div> */}
		{/* </div> */}




		</>
		
	);
}

export default RecommenderSearch;