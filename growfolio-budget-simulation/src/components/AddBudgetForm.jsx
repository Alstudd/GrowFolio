// library imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

// react imports
import { useEffect, useRef } from "react";

// react-router-dom imports
import { Form, useFetcher } from "react-router-dom";

function AddBudgetForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="head2">Your Income</h2>
      <fetcher.Form method="post" className="myForm" ref={formRef}>
        <div className="hidden inner-myForm">
          <label htmlFor="newBudget">Income Name</label>
          <input
            defaultValue={"Income"}
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="Eg. Food, Rent, etc."
            required
          />
        </div>
        <div className="inner-myForm">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="Eg. Rs. 10000"
            inputMode="decimal"
            required
            ref={focusRef}
          />
        </div>
        {/* <div className='inner-myForm'>
                <label htmlFor='newBudgetDate'>Date</label>
                <input
                    type='date'
                    name='newBudgetDate'
                    id='newBudgetDate'
                    required
                />
            </div> */}
        <input type="hidden" name="_action" value="createBudget" />
        <button
          type="submit"
          className="btn bg-[#00b386]"
          style={{ width: "140px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Creating...</span>
          ) : (
            <>
              <span>Create</span>
              <CurrencyRupeeIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}

export default AddBudgetForm;
